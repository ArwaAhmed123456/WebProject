import React, { useState } from "react";
import "./DeliveryOption.css";

const DeliveryOptions = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        if (!deliveryMethod) return "Please select a delivery method.";
        if (!billingDetails.name.trim()) return "Name is required.";
        if (!billingDetails.address.trim()) return "Address is required.";
        if (!billingDetails.email.trim()) return "Email is required.";
        if (!billingDetails.phone.trim()) return "Phone number is required.";
        return null;
    };

    const handleConfirm = () => {
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            setConfirmation("");
            return;
        }

        setLoading(true);
        setError("");
        setConfirmation("");

        const data = {
            deliveryMethod,
            billingDetails,
        };

        fetch("http://localhost:5000/api/delivery-options", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.error || "Submission failed.");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setConfirmation(data.message || "Delivery information submitted successfully!");
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            })
            .finally(() => setLoading(false));
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        setError("");
    };

    return (
        <div className="delivery-container">
            <h1 className="delivery-title">Delivery Options</h1>
            <div className="delivery-options">
                <label>
                    <input
                        type="radio"
                        value="home_delivery"
                        checked={deliveryMethod === "home_delivery"}
                        onChange={() => setDeliveryMethod("home_delivery")}
                    />
                    Home Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        value="curbside_pickup"
                        checked={deliveryMethod === "curbside_pickup"}
                        onChange={() => setDeliveryMethod("curbside_pickup")}
                    />
                    Curbside Pickup
                </label>
                <label>
                    <input
                        type="radio"
                        value="in_store"
                        checked={deliveryMethod === "in_store"}
                        onChange={() => setDeliveryMethod("in_store")}
                    />
                    In-Store Collection
                </label>
            </div>

            <h2>Billing Information</h2>
            <div className="billing-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={billingDetails.name}
                    onChange={handleBillingChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Billing Address"
                    value={billingDetails.address}
                    onChange={handleBillingChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={billingDetails.email}
                    onChange={handleBillingChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={billingDetails.phone}
                    onChange={handleBillingChange}
                />
            </div>

            <button onClick={handleConfirm} disabled={loading}>
                {loading ? "Submitting..." : "Confirm"}
            </button>

            {error && <p className="error-message">{error}</p>}
            {confirmation && <p className="confirmation-message">{confirmation}</p>}
        </div>
    );
};

export default DeliveryOptions;
