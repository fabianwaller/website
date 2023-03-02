import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import formatDate from '../../lib/formatdate'

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

const Post = ({postData}) => {
    return (
        <Layout page='blog'>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {/* <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article> */}

            <article className="section">

                <div className='article__box article__box--single container grid'>

                    <h1 className="article__title">{postData.title}</h1>

                    <p className='article__text'>{postData.description}</p>

                    <div className="article__content" id='article-content' dangerouslySetInnerHTML={{__html: postData.contentHtml}} />

                    <span className="project__info flex">
                        article published on {formatDate(new Date(postData.date))}
                    </span>

                </div>

            </article>
        </Layout>
    );
}

export default Post