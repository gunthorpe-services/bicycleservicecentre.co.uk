import React, {Component}  from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import data from "./data";
import './App.css';

function App() {
  return (
  <Router basename='/'>
    <div className="App">
      <Switch>
        <Route path="/product/:productId" component={ProductPage} />
        <Route path="/category/:category" component={CategoryPage} />

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>

        <div className="clear"></div>

        <footer className="footer-distributed">
			<div className="footer-center">
				<div>
					<img className="footer-img" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" border="0" alt="PayPal Acceptance Mark" />
				</div>
				<div>
					<p><a className="email" href="mailto:service@bicycleservicecentre.co.uk">service@bicycleservicecentre.co.uk</a></p>
				</div>
				<div>
				    <p className="footer-company-name">&copy; Bicycle Service Centre</p>
				</div>
			</div>
			<div className="footer-right">
				<p className="footer-company-about">
					<span>We offer quality bicycle tools, bearings and spare parts.</span>
				</p>
			</div>
		</footer>
    </div>
  </Router>
  );
}

class Paypal extends Component {
  render() {
    return (
      <div>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <label className="price" htmlFor="submit">&pound;{this.props.price} &amp; <strong>FREE</strong> UK Delivery &nbsp;</label>
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value={this.props.paypalButtonId} />
          <input className="buynow" type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
    );
  }
}

//TODO: set class = active if this.props.selected matches category
class Headery extends Component {
  constructor(props) {
        super(props);
        this.state = {
            categories: [
                {id: 1, name: 'Tools', url: '/#/category/tools'},
                {id: 2, name: 'Bearings', url: '/#/category/bearings'},
                {id: 3, name: 'Thule', url: '/#/category/thule'},
            ]
        };
  }

  render() {
    return (
        <div className="topnav">
          <a href="/" className="logo"><img className="responsive" src="/images/bsc-logo-border.png" alt="Bicycle Service Centre Logo"/></a>
          <a href="/" className="x">Bicycle Service Centre</a>
          {this.state.categories.map((category, key) =>
            <a className={category.name.toUpperCase() === this.props.selected.toUpperCase() ? 'active' : null} href={category.url} key={category.id}>{category.name}</a>
          )}
        </div>
    );
  }
}

function Home() {
  return <AllProductsPage/>;
}

function NoMatch() {
  return <h2>404</h2>;
}

//TODO: check for undefined
const ProductPage = ({ match, location }) => {
  const { params: { productId } } = match;

  var products = data.products.filter( function (product) {
            return product.id === productId
          });

  return (
    <>
      <Headery selected={products[0].category} />
      <div className="product">
        <h1>{products[0].name}</h1>
        <Paypal price={products[0].price} paypalButtonId={products[0].paypalButtonId} />
        <h2 className="description">Description</h2>
                        {
        					products[0].description.map((para, i) => {
        						return (
                                        <p key={i}>{para.p}</p>
        						);
        					})
        				}
        <div>
<Carousel
  infinite
  stopAutoPlayOnHover
  dots
  slidesPerPage={2}
  autoPlay={3000}
  animationSpeed={1000}
  breakpoints={{
          1250: { // these props will be applied when screen width is less than 1000px
            slidesPerPage: 1,
            slidesPerScroll: 1,
          },
          750: { // these props will be applied when screen width is less than 501px
            slidesPerPage: 1,
            slidesPerScroll: 1,
          },
        }}
>
                {
					products[0].images.map((image, i) => {
						return (
                                <img className="responsive" key={i} src={image.imageurl} alt={products[0].name} />
						);
					})
				}
</Carousel>
        </div>

      </div>
    </>
  );
};

const CategoryPage = ({ match, location }) => {
  const { params: { category } } = match;

  var products = data.products.filter( function (product) {
            return product.category.toUpperCase() === category.toUpperCase()
          });

  return (
    <>
                <Headery selected={category} />
                <div className="product">
                  <h1 className="capitalize">{category}</h1>
                    {
    					products.map((product, i) => {
    						return (
    						<div className="parent">
                                <div key={i} className="left">
                                    <a href={"/#/product/" + product.id}><img key={i} src={product.images[0].imageurl} className="xresponsive" alt={product.name} /></a>
                                </div>
                                <div className="left">
                                    <a href={"/#/product/" + product.id}>{product.name}</a>
                                </div>
                                <div className="right">
                                    <a className="price" href={"/#/product/" + product.id}>&pound;{product.price}</a>
                                </div>
                                <div className="clear" />
                            </div>
    						);
    					})
    				}
                </div>
            </>
  );
};

class AllProductsPage extends Component {
  render() {
    return (
    <>
                <Headery selected="" />
                <div className="product">
                  <h1 className="capitalize">All Products</h1>
                  <div className="row">
                    {
    					data.products.map((product, i) => {
    						return (
    						<div key={i} className="column">
                                    <div className="left"><img key={i} src={product.images[0].imageurl} className="xresponsive" alt={product.name} /></div>
                                    <div className="left"><a href={"/#/product/" + product.id}>{product.name}</a></div>
                                    <div className="right"><a className="price" href={"/#/product/" + product.id}>&pound;{product.price}</a></div>
                            </div>
    						);
    					})
    				}
    				</div>
                </div>
            </>
  );
  };
}

export default App;
