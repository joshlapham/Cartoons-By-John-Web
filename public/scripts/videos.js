var Video = React.createClass({
 render: function() {
   return (
     <section className="video">
       <h3 className="videoTitle">
         {this.props.title}
       </h3>

       {this.props.description}
       <br />{this.props.duration}
       <br />{this.props.date}
     </section>
   );
 }
});

var VideoBox = React.createClass({
  loadVideosFromServer: function() {
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
    this.loadVideosFromServer();
    setInterval(this.loadVideosFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <section className="videoBox">
        <VideoList data={this.state.data} />
      </section>
    );
  }
});

var VideoList = React.createClass({
  render: function() {
    var videoNodes = this.props.data.map(function(video) {
      return (
        <Video title={video.title} key={video.youtube_id} description={video.description} duration={video.duration} date={video.date}>
        </Video>
      );
    });
    return (
      <section className="videoList">
        {videoNodes}
      </section>
    );
  }
});

ReactDOM.render(
  <VideoBox url="http://localhost:3002/videos" pollInterval={2000} />,
  document.getElementById('content')
);
