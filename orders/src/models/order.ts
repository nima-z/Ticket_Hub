import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

// the reason that we have two seperate interfaces for userattrs and userdoc, which are identical,
// is that creating a new item might be different than the actual final item.

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

// creating build method based on Order Model
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export { Order };
