import React from "react";
import {Link} from 'react-router-dom';

const DetailsPage = () => {
    return (
        <>
        <section className="detailsPage">
            <div className="breadcrumbWrapper">
            <div className="container-fluid">
            <ul className="breadcrumb">
                <li><Link>Home</Link></li>
                <li><Link>Pictures</Link></li>
                <li><Link>Summer 15</Link></li>
                <li><Link>Italy</Link></li>
            </ul>
            </div>
            </div>
        </section>
        </>
    )
}

export default DetailsPage;