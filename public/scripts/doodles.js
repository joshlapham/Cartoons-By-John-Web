var Doodle = React.createClass({
 render: function() {
   return (
     <section className="doodle">
       <a href={"https://www.instagram.com/p/" + this.props.instagram_id}><img src={this.props.image_url} width='75' height='75' /></a>
     </section>
   );
 }
});

var DoodleBox = React.createClass({
  loadDoodlesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDoodlesFromServer();
    setInterval(this.loadDoodlesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <section className="doodle-box row">
        <DoodleList data={this.state.data} />
      </section>
    );
  }
});

var DoodleList = React.createClass({
  render: function() {
    var doodleNodes = this.props.data.map(function(doodle) {
      return (
        <Doodle title={doodle.title} instagram_id={doodle.instagram_id} description={doodle.description} image_url={doodle.image_url} date={doodle.date}>
        </Doodle>
      );
    });
    return (
      <section className="doodle-list">
        {doodleNodes}
      </section>
    );
  }
});

ReactDOM.render(
  <DoodleBox url="http://localhost:3002/doodles" pollInterval={2000} />,
  document.getElementById('doodle-content')
);
