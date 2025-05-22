import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { BellIcon } from "lucide-react";

export default function Notifications() {
  const [buyerId, setBuyerId] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerAndNotifications = async () => {
      try {
        const user = await appwriteService.getCurrentUser();
        if (user) {
          setBuyerId(user.$id);
          const notifResponse = await appwriteService.getNotificationsByBuyerId(user.$id);
          setNotifications(notifResponse.documents || []);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerAndNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading your notifications...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">🔔 You have no notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <BellIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      </div>

      <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-2">
        {notifications.map((notif) => (
          <div key={notif.$id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            {notif.messages && notif.messages.length > 0 ? (
              <ul className="space-y-2">
                {notif.messages.map((msg, index) => {
                  const postId = notif.postId; // assuming this is included
                  const pattern = /"(.+?)"/; // match the product title in quotes
                  const match = msg.match(pattern);
                  const productTitle = match ? match[1] : null;

                  return (
                    <li
                      key={index}
                      className="text-gray-800 bg-white p-2 rounded shadow-sm border border-gray-100"
                    >
                      <span className="block">
                        {productTitle && postId ? (
                          <>
                            {msg.split(`"${productTitle}"`)[0]}
                            <Link
                              to={`/post/${postId}`}
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              "{productTitle}"
                            </Link>
                            {msg.split(`"${productTitle}"`)[1]}
                          </>
                        ) : (
                          msg
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No messages in this notification.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
