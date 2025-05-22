import { useState } from "react";
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account, Permission, Role } from "appwrite";

class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // ----- Post CRUD -----

    async createPost({
        title, slug, content, featuredImage = [], status, userId,
        postedBy, rate, dateAD, dateBS, phoneNo, location, category
    }) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title, slug, content, featuredImage, status, userId,
                    postedBy, rate, dateAD, dateBS, phoneNo, location, category
                }
            );
    
            await this.databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteOfferCollectionId,
    ID.unique(),
    {
    postId: post.$id,
    sellerId: userId,
    sellerName: postedBy,
    offerPrice: [],
    buyerId: [],
    buyerName: []
  },
    [
        Permission.read(Role.any()), 
        Permission.write(Role.any()), 
        Permission.update(Role.any()),
        Permission.delete(Role.any())
    ]
);

    
            return post;
        } catch (error) {
            console.error("createPost error:", error);
            throw error;
        }
    }
    

    async updatePost(postId, {
        title, slug, content, featuredImage = [], status, userId,
        postedBy, rate, dateAD, dateBS, phoneNo, location, category
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {
                    title, slug, content, featuredImage, status, userId,
                    postedBy, rate, dateAD, dateBS, phoneNo, location, category
                }
            );
        } catch (error) {
            console.error("updatePost error:", error);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId);
            return true;
        } catch (error) {
            console.error("deletePost error:", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId);
        } catch (error) {
            console.error("getPost error:", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.error("getPosts error:", error);
        }
    }

    // ----- File Upload -----

    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
            return result.$id;
        } catch (error) {
            console.error("uploadFile error:", error);
            throw new Error("Failed to upload file.");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("deleteFile error:", error);
            return false;
        }
    }

    async getFilePreviews(fileIds) {
        try {
            if (!Array.isArray(fileIds)) return [];
            return fileIds.map(fileId => this.bucket.getFileView(conf.appwriteBucketId, fileId));
        } catch (error) {
            console.error("getFilePreviews error:", error);
            return [];
        }
    }

    // ----- Auth -----

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("getCurrentUser error:", error);
            return null;
        }
    }

async addOfferToPost(postId, buyerId, buyerName, amount) {
  try {
    // Step 1: Add offer to offer collection
    const offers = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId,
      [Query.equal("postId", postId)]
    );

    if (offers.documents.length === 0) {
      throw new Error("Offer document not found for this post.");
    }

    const offerDoc = offers.documents[0];
    const updatedOfferPrice = [...offerDoc.offerPrice, amount];
    const updatedBuyerId = [...offerDoc.buyerId, buyerId];
    const updatedBuyerName = [...offerDoc.buyerName, buyerName];

    await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId,
      offerDoc.$id,
      {
        offerPrice: updatedOfferPrice,
        buyerId: updatedBuyerId,
        buyerName: updatedBuyerName,
      }
    );

    // Step 2: Check if any notification document for this post contains this buyerId
    const notifications = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteNotificationsCollectionId,
      [Query.equal("postId", postId)]
    );

    const buyerExists = notifications.documents.some((doc) =>
      Array.isArray(doc.buyerId)
        ? doc.buyerId.includes(buyerId)
        : doc.buyerId === buyerId
    );

    if (!buyerExists) {
      // Create new notification entry with buyerId and postId
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotificationsCollectionId,
        ID.unique(),
        {
          postId,
          buyerId,
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
    }
    // else do nothing (buyerId already exists)

  } catch (error) {
    console.error("addOfferToPost error:", error);
    throw error;
  }
}


// For getting all offers
async getOffers() {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId
    );
  } catch (error) {
    console.error("getOffers error:", error);
    throw error;
  }
}

// For updating a specific offer
async updateOfferStatus(offerId, status) {
  try {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId,
      offerId,
      { status }
    );
  } catch (error) {
    console.error("updateOfferStatus error:", error);
    throw error;
  }
}

// Fetch notifications filtered by postId and buyerId
async getNotifications(postId, buyerId) {
  return this.databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteNotificationsCollectionId,
    [
      Query.equal("postId", postId),
      Query.equal("buyerId", buyerId)
    ]
  );
}

// Update the messages array of a notification document by ID
async updateNotificationMessages(notificationId, updatedMessages) {
  return this.databases.updateDocument(
    conf.appwriteDatabaseId,
    conf.appwriteNotificationsCollectionId,
    notificationId,
    {
      messages: updatedMessages
    }
  );
}

// Fetch all notifications for a specific buyerId
async getNotificationsByBuyerId(buyerId) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteNotificationsCollectionId,
      [Query.equal("buyerId", buyerId)]
    );
  } catch (error) {
    console.error("getNotificationsByBuyerId error:", error);
    return { documents: [] };
  }
}

async removeBuyerOffer(offerDocId, buyerIdToRemove, offerPriceToRemove) {
  try {
    const offerDoc = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId,
      offerDocId
    );

    const newBuyerId = [];
    const newBuyerName = [];
    const newOfferPrice = [];

    offerDoc.buyerId.forEach((id, index) => {
      const price = offerDoc.offerPrice[index];
      if (!(id === buyerIdToRemove && price === offerPriceToRemove)) {
        newBuyerId.push(offerDoc.buyerId[index]);
        newBuyerName.push(offerDoc.buyerName[index]);
        newOfferPrice.push(offerDoc.offerPrice[index]);
      }
    });

    await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOfferCollectionId,
      offerDocId,
      {
        buyerId: newBuyerId,
        buyerName: newBuyerName,
        offerPrice: newOfferPrice
      }
    );

    return true;
  } catch (error) {
    console.error("removeBuyerOffer error:", error);
    return false;
  }
}
// Add this to your Service class in config.js
async getAllUsers() {
  try {
    return await this.account.list(); // ❌ Only works in server-side SDK
  } catch (error) {
    console.error("getAllUsers error:", error);
    return { users: [] };
  }
}

    
}


const service = new Service();
export default service;
export { Client, Account, Databases, Storage };
