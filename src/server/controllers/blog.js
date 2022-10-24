import Cluster from './cluster.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 });

export const verifyCache = (req, res, next) => {
    try {
        let slug = req.query.slug;
        if (slug == null) {
            slug = 'all';
        }
        if (cache.has(slug)) {
            return res.status(200).json(cache.get(slug));
        }
        return next();
    } catch (err) {
        throw new Error(err);
    }
}

export const sendArticles = () => async (req, res) => {
    let slug = req.query.slug;
    if (slug == null) {
        slug = 'all';
    }
    let data = await getArticles(slug)
    return res.status(200).json(data);
}

export const getArticles = async (slug) => {
    let cluster = new Cluster();
    let mongoClient = cluster.getMongoClient();
    try {
        const db = mongoClient.db('personal-website');
        const collection = db.collection('blog');
        let data;
        if (slug == 'all') {
            data = await collection.find().toArray();
        } else {
            data = await collection.find({ 'slug': slug }).toArray();
        }
        cache.set(slug, data);
        return data;
    } finally {
        cluster.disconnect();
    }
}

export async function createArticle(collection) {
    const data = {
        title: 'Momo',
        slug: 'momo',
        categorie: '',
        imageurl: '',
        date: new Date(),
        text: "",
        content: ``
    }

    await collection.insertOne(data);

    console.log("created article");
}