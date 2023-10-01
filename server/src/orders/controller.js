const pool = require("../../db");
const queries = require("./queries")
const Shipengine = require("shipengine");
const shipengine = new Shipengine(process.env.SE_URI);

async function getRatesWithShipmentDetails(userData) {
    const params = {
        rateOptions: {
            carrierIds: ["se-5035034",],
        },
        shipment: {
            validateAddress: "no_validation",
            shipTo: {
                name: userData.name ? userData.name : undefined,
                phone: userData.phoneNumber ? userData.phoneNumber : undefined,
                addressLine1: userData.address.street,
                cityLocality: userData.address.city,
                stateProvince: userData.address.state,
                postalCode: userData.address.zipcode,
                countryCode: userData.address.country,
                addressResidentialIndicator: "yes",
            },
            shipFrom: {
                companyName: "Audiophile",
                name: "John Doe",
                phone: "111-111-1111",
                addressLine1: "4009 Marathon Blvd",
                addressLine2: "Suite 300",
                cityLocality: "Austin",
                stateProvince: "TX",
                postalCode: "78756",
                countryCode: "US",
                addressResidentialIndicator: "no",
            },
            packages: userData.items,
        },
    };

    try {
        const result = await shipengine.getRatesWithShipmentDetails(params);
        return result
    } catch (error) {
        throw error;
    }
}

const getRates = async (req, res) => {
    try {
        console.log('getting rates')
        const formData = JSON.parse(req.query.form);

        const mappedCart = formData.cart.map(data => {
            return {
                weight: {
                    value: data.weight * data.quantity,
                    unit: "pound",
                },
            }
        });
        const userData = {
            address: {
                street: formData.address.street,
                zipcode: formData.address.zipcode,
                city: formData.address.city,
                country: formData.address.country,
                state: formData.address.state,
            },
            items: mappedCart
        };
        const shippingRate = await getRatesWithShipmentDetails(userData)
        console.log(shippingRate)
        res.json({ shippingRate })
        
    } catch (error) {
        console.error("Error in getRates:", error);
        res.status(400).json({ error: "Invalid data format" });
    }
};

const getOrders = (req, res) => {
    console.log('calling');

    pool.query(queries.getOrders, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results.rows);
        }
    });
};

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getOrderById, [id], (error, results) => {
        if (error) {
            throw error
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const addOrder = (req, res) => {
    const userData = req.body
    const user_id = userData.user_id
    const shipping_price = userData.shippingPrice
    const cart = userData.cart
    const name = userData.name
    const email = userData.email
    const tax = userData.tax
    const total = userData.totalPrice
    pool.query(queries.addOrder, [ user_id, shipping_price, cart, name, email, tax, total ], (error, results) => {
        if (error) {
            throw error
        } else {
            res.status(201).send("Order Created Successfully!")
            console.log("Order created")
        }
    })
}

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    getRates
};