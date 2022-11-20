import mongoose from 'mongoose';

import slugify from 'slugify';
import showdown from 'showdown';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    slug: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    markdown: {
        type: String,
        required: [true, 'Markdown is required'],
    },
    html: {
        type: String
    }
});

articleSchema.pre('save', async function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    let markdownConverter = new showdown.Converter();
    this.html = await markdownConverter.makeHtml(this.markdown);

    next();
});


export default mongoose.model('Article', articleSchema, "blog");