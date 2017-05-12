import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, browserHistory, Link, Switch, Route } from 'react-router-dom';
import { CleverCloudinaryReact, Transformation } from 'clever-cloudinary-react';
import axios from 'axios';

const Router = HashRouter;
const imageJson = './images.json';

// Components
class NavBar extends React.Component {
  render() {
    return <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <CleverCloudinaryReact cloudName="elsmore-me" title="Cloudinary Demo" publicId="cloudinary_logo" width="200" crop="scale"/>
        </Link>
      </div>
    </nav>;
  }
}
class SiteFooter extends React.Component {
  render() {
    return <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">React Progressive Web App Demo</h5>
            <p className="grey-text text-lighten-4">See how to super charge your React app by following the tenets of Progressive Web Apps and using service worker progressively.</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2017 Copyright Cloudinary
        <a className="grey-text text-lighten-4 right" href="https://elsmore.me">Made with &#9829; by Mike Elsmore</a>
        </div>
      </div>
    </footer>;
  }
}
class PhotoThumb extends React.Component {
  render() {
    return <div className="card hoverable small">
      <div className="card-image">
        <CleverCloudinaryReact cloudName="elsmore-me" publicId={this.props.publicId} title={this.props.name} width="200">
          <Transformation height="500" width="500" crop="thumb" gravity="face"/>
          <Transformation height="150" width="300" crop="fill"/>
          <Transformation overlay="cloudinary_logo" width="100" x="10" y="10" opacity="70" gravity="south_east"/>
        </CleverCloudinaryReact>
        <span className="card-title">{this.props.name}</span>
      </div>
      <div className="card-content">
        <p>This photo could be of anything, but faces help prove a point.</p>
      </div>
      <div className="card-action">
        <Link to={`/view/${this.props.publicId}`} className="waves-effect waves-light btn" >Go Big</Link>
      </div>
    </div>;
  }
}
let Homepage = React.createClass({
  getInitialState: function() {
    return {
      photos: []
    }
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest =
      axios.get(imageJson)
        .then(function(result) {
          result.data.key = result.data.publicId;
          th.setState({
            photos: result.data
          });
        })
  },

  componentWillUnmount: function() {
    // this.serverRequest.abort();
  },

  render: function() {
    return (
      <div className="row">
        {this.state.photos.map(function(photo) {
            return (
              <div className="col l3 m4 s12" >
                <PhotoThumb publicId={photo.publicId} name={photo.name}></PhotoThumb>
              </div>
            );
          })}
      </div>
    )
  }
});
let ViewPhoto = React.createClass({
  getInitialState: function() {
    return {
      photos: []
    }
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest =
      axios.get(imageJson)
        .then(function(result) {
          th.setState({
            photos: result.data
          });
        })
  },

  componentWillUnmount: function() {
    // this.serverRequest.abort();
  },
  render: function() {
    const publicId = this.props.match.params.publicId;
    let photoDetails = {};
    this.state.photos.map(function(photo) {
      if(photo.publicId == publicId) {
        photoDetails = photo;
      }
    });
    return (
        <div>
          <div className="col s12" >
            <h1 className="center-align">{photoDetails.name}</h1>
          </div>
          <div className="row">
            <div className="col l7 s12 full-image" >
              <CleverCloudinaryReact cloudName="elsmore-me" publicId={photoDetails.publicId} >
                <Transformation overlay="cloudinary_logo" width="500" x="10" y="10" opacity="70" gravity="south_east"/>
              </CleverCloudinaryReact>
            </div>
            <div className="col l5 s12" >
              <p className="flow-text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor massa a odio convallis fermentum. Ut imperdiet arcu sed fermentum luctus. Duis placerat auctor turpis ac varius. In libero sapien, laoreet mollis felis viverra, egestas eleifend arcu. Aliquam dapibus enim a bibendum semper. Etiam elit sapien, commodo vestibulum lacus sed, congue mollis sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et nisi pulvinar, eleifend leo sit amet, semper quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis rutrum tellus, dapibus efficitur arcu dignissim nec. Praesent sed rutrum orci. Quisque et urna vel orci interdum varius ac id ex. Sed magna massa, cursus sit amet posuere quis, sollicitudin pellentesque eros. Proin imperdiet nibh id urna dapibus, at luctus orci fringilla. Aenean ut enim tristique, blandit lacus sed, luctus elit. Nulla ac viverra diam, quis vestibulum sapien.</p>
              <p>Sed tincidunt mattis sapien et bibendum. Etiam sollicitudin augue ut nibh lacinia, sollicitudin pretium ante fringilla. Nam interdum diam id tellus dapibus, eu tincidunt elit interdum. Aliquam ligula nunc, vestibulum sit amet pharetra eu, vestibulum ut orci. Etiam sed urna purus. Nunc varius, velit nec sodales tincidunt, lacus justo pharetra est, a faucibus magna ante at mauris. Nam dictum ornare nunc vel interdum. Duis eget ornare justo. Phasellus non tempor quam, et rutrum sem. Etiam molestie pulvinar suscipit. Pellentesque semper, lacus ac scelerisque rhoncus, libero erat convallis diam, a interdum odio metus nec ante. Sed pellentesque tortor porttitor turpis efficitur lacinia. Quisque pharetra luctus nisi in vestibulum.</p>
              <p>Vestibulum dictum elit sed velit vehicula suscipit. Aliquam semper, nunc vel mollis semper, neque metus fermentum quam, a placerat nisi erat ornare erat. Pellentesque pulvinar, magna quis finibus placerat, metus justo elementum lectus, at elementum sem eros eget enim. Nulla tortor velit, gravida ac nibh vel, porta ornare elit. Pellentesque at fermentum elit. Maecenas pharetra tempor orci eu iaculis. Suspendisse potenti. Proin pretium condimentum venenatis.</p>
              <p>Vestibulum pellentesque orci mi, eu pellentesque felis aliquam nec. Suspendisse pharetra mattis facilisis. Nam egestas faucibus odio, sed mattis ante tincidunt sit amet. Vestibulum leo purus, efficitur porttitor ipsum luctus, bibendum imperdiet odio. Praesent nibh lacus, pulvinar non euismod sed, volutpat at augue. Pellentesque enim leo, maximus nec arcu ac, posuere pellentesque elit. Suspendisse molestie sed justo eget facilisis.</p>
              <p>Cras finibus dignissim nulla, ac porta ligula pretium vel. Vivamus non dolor lectus. Duis magna ligula, fringilla ac ex eu, aliquam semper erat. Donec non ipsum at tellus mattis sagittis fringilla quis libero. Nam aliquet rutrum libero, id finibus odio ornare hendrerit. Sed eget nulla lacinia, malesuada arcu non, commodo neque. Duis quis varius libero, ut volutpat justo.</p>
            </div>
          </div>
        </div>
    )
  }
});

class Main extends React.Component {
  render() {
    return <main>
      <Switch>
        <Route path='/view/:publicId' component={ViewPhoto}/>
        <Route exact path='/' component={Homepage}/>
      </Switch>
    </main>;
  }
}

class App extends React.Component {
  render() {
    return <div>
      <NavBar/>
      <Main/>
      <SiteFooter/>
    </div>;
  }
}

ReactDOM.render(
    <Router history={browserHistory}>
      <App/>
    </Router>,
  document.getElementById('app-root')
);
