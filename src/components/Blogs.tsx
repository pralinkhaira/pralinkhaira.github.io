import { blogs } from '../data';

const Blogs = () => {
    return (
        <section id="blogs" className="full-height px-lg-5">
            <div className="container">
                <div className="row pb-4" data-aos="fade-up">
                    <div className="col-lg-8">
                        <h6 className="text-brand">BLOGS</h6>
                        <h1>Sharing what I learnt</h1>
                    </div>
                </div>

                <div className="row gy-4">
                    {blogs.map((blog, index) => (
                        <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="service p-4 bg-base rounded-4 shadow-effect">
                                <img className="rounded-4" src={blog.image} alt={blog.title} />
                                <h5 className="mt-4 mb-2">{blog.title}</h5>
                                <p>{blog.description}</p>
                                <a href={blog.link} className="link-custom" target="_blank">Read Blog!</a>
                            </div>
                        </div>
                    ))}
                    &emsp;&emsp;
                    <p className="lead mt-2 mb-4" data-aos="fade-up" data-aos-delay="300">
                        Please consider exploring my additional blogs available <span className="link-custom"><a href="https://beyondcoding-19.blogspot.com/" className="link-custom" target="_blank"> HERE </a></span> as well.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
