const { Order, OrderItem, Product } = require('../models');

// CREATE an order
exports.createOrder = async (req, res) => {
  try {
    const { customer_name, email, address, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products in order" });
    }

    // 1️⃣ Create order (customer info)
    const order = await Order.create({ customer_name, email, address });

    // 2️⃣ Create OrderItems for each product
    const items = await Promise.all(
      products.map(async (productId) => {
        // fetch product price from Product table
        const product = await Product.findByPk(productId);
        if (!product) throw new Error(`Product ID ${productId} not found`);

        return OrderItem.create({
          orderId: order.id,
          productId,
          price: product.Product_price,
        });
      })
    );

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: order.id,
      items: items.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET all orders with products
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product }],
        },
      ],
    });

    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
