const { Order, OrderItem, Product } = require('../models');
const generateOrderPDF = require("../utils/generateOrderPDF");
const sendWhatsapp = require("../utils/sendWhatsapp");

// CREATE an order
exports.createOrder = async (req, res) => {
  try {
      console.log("REQ BODY 👉", req.body);
    const { customer_name, email, mobile, address, products } = req.body;
      console.log("MOBILE 👉", mobile);

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No products in order" });
    }

    const order = await Order.create({
      customer_name,
      email,
      mobile,
      address,
    });

    await Promise.all(
      products.map(async (productId) => {
        const product = await Product.findByPk(productId);
        if (!product) throw new Error(`Product ID ${productId} not found`);

        return OrderItem.create({
          orderId: order.id,
          productId,
          price: product.Product_price,
        });
      })
    );

    // // 🔥 Generate PDF
    // const pdf = await generateOrderPDF({
    //   orderId: order.id,
    //   customer_name,
    //   mobile,
    //   address,
    // });

    // // 🔥 Send PDF to admin WhatsApp
    // await sendWhatsapp({
    //   orderId: order.id,
    //   pdfUrl: pdf.publicUrl,
    // });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      id: order.id, // ✅ frontend-friendly
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};


// GET all orders with products
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product, // ✅ THIS FIXES Product: null
            },
          ],
        },
      ],
    });

    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

