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

            <footer>
            <div className="bottom">
              <div className="left">&copy; Bicycle Service Centre</div>
              <div className="right"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" className="responsive-md right" border="0" alt="PayPal Acceptance Mark" /></div>
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
          <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!" />
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
        <div className="header-right">
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
        <div className="header">
          <div><a href="/" className="logo"><img className="responsive-sm" src="/images/bsc-logo-border.png" alt="Bicycle Service Centre Logo"/>Bicycle Service Centre</a></div>
          <div className="clear"/>
          <Headery selected={products[0].category} />
        </div>
      <div className="product">
        <h1>{products[0].name}</h1>
        <Paypal price={products[0].price} paypalButtonId={products[0].paypalButtonId} />
        <h2>Description</h2>
                        {
        					products[0].description.map((para, i) => {
        						return (
                                        <p key={i}>{para.p}</p>
        						);
        					})
        				}
        <div>
<Carousel
  centered
  infinite
  stopAutoPlayOnHover
  arrows
  dots
  slidesPerPage={3}
  autoPlay={3000}
  animationSpeed={1000}
  breakpoints={{
          1250: { // these props will be applied when screen width is less than 1000px
            slidesPerPage: 2,
            slidesPerScroll: 1,
            centered: false,
          },
          750: { // these props will be applied when screen width is less than 501px
            slidesPerPage: 1,
            slidesPerScroll: 1,
            centered: false,
          },
        }}
>
                {
					products[0].images.map((image, i) => {
						return (
                                <img className="responsive" key={i} height="400" src={image.imageurl} alt={products[0].name} />
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
                   <div className="header">
                     <div><a href="/" className="logo"><img className="responsive-sm" src="/images/bsc-logo-border.png" alt="Bicycle Service Centre Logo"/>Bicycle Service Centre</a></div>
                     <div className="clear" />
                     <Headery selected={category} />
                   </div>
                <div className="product">
                  <h1 className="capitalize">{category}</h1>
                    {
    					products.map((product, i) => {
    						return (
    						<div className="parent">
                                <div key={i} className="left">
                                    <img key={i} width="200" src={product.images[0].imageurl} className="xresponsive" alt={product.name} />
                                </div>
                                <div className="left">
                                    <a href={"/#/product/" + product.id}>{product.name}</a>
                                </div>
                                <div className="left">
                                    <a href={"/#/product/" + product.id}>&pound;{product.price}</a>
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
                   <div className="header">
                     <div><a href="/" className="logo"><img className="responsive-sm" src="/images/bsc-logo-border.png" alt="Bicycle Service Centre Logo"/>Bicycle Service Centre</a></div>
                     <div className="clear" />
                     <Headery selected="" />
                   </div>
                <div className="product">
                  <h1 className="capitalize">All Products</h1>
                    {
    					data.products.map((product, i) => {
    						return (
    						<div className="parent">
                                <div key={i} className="left">
                                    <img key={i} width="200" src={product.images[0].imageurl} className="xresponsive" alt={product.name} />
                                </div>
                                <div className="left">
                                    <a href={"/#/product/" + product.id}>{product.name}</a>
                                </div>
                                <div className="left">
                                    <a href={"/#/product/" + product.id}>&pound;{product.price}</a>
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
}

export default App;
