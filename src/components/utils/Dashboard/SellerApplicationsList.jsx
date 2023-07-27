import React, {useEffect, useState} from "react";
import axios from "axios";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
};

const SellerApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("/api/seller/applications");
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };
        fetchApplications();
    }, [refresh]);

    const handleDetailsClick = (application) => {
        setSelectedApplication(application);
    };

    const handleCloseModal = () => {
        setSelectedApplication(null);
    };

    const isWaitingStatus = selectedApplication && selectedApplication.status === "WAITING";

    const handleApprove = async () => {
        try {
            await axios.post(`/api/seller/application/approve/${selectedApplication._id}`);
            console.log("Application Approved Successfully!");
            handleCloseModal();
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error approving application:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await axios.post(`/api/seller/application/decline/${selectedApplication._id}`);
            console.log("Application Declined Successfully!");
            handleCloseModal();
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error declining application:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">List of Seller Applications</h2>
            <ul className="list-group">
                {applications.map((application) => (
                    <li key={application._id} className="list-group-item">
                        <div className="d-flex flex-wrap">
                            <div className="col-md-4">
                                <p>
                                    <strong>First name:</strong> {application.name}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p>
                                    <strong>Type:</strong> {application.productsType}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p>
                                    <strong>ICO:</strong> {application.ico}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p>
                                    <strong>e-mail:</strong> {application.email}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p>
                                    <strong>Status:</strong> {application.status}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleDetailsClick(application)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedApplication && (
                <div
                    className="modal show"
                    tabIndex="-1"
                    role="dialog"
                    style={{display: "block"}}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Application Details</h5>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <strong>First name:</strong> {selectedApplication.name}
                                </p>
                                <p>
                                    <strong>Type:</strong> {selectedApplication.productsType}
                                </p>
                                <p>
                                    <strong>ICO:</strong> {selectedApplication.ico}
                                </p>
                                <p>
                                    <strong>e-mail:</strong> {selectedApplication.email}
                                </p>
                                <p>
                                    <strong>link:</strong> {selectedApplication.websiteLink}
                                </p>
                                <p>
                                    <strong>Address:</strong> {selectedApplication.address}
                                </p>
                                <p>
                                    <strong>Description:</strong> {selectedApplication.description}
                                </p>
                                <p>
                                    <strong>Created At:</strong> {formatDate(selectedApplication.createdAt)}
                                </p>
                                <p>
                                    <strong>Updated At:</strong> {formatDate(selectedApplication.updatedAt)}
                                </p>
                            </div>
                            {isWaitingStatus && (
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleApprove}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleDecline}
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerApplicationsList;
