import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        eventType: {
            type: String,
            required: true
        },
    },
{
    timestamps: true
}
);

const webhookEventModel = mongoose.model("WebhookEvent", webhookEventSchema);

export default webhookEventModel;