import React, { Component } from "react"
import { hot } from "react-hot-loader"
import withStyles from "react-jss"

const styles = {
  container: {
    background: "red"
  }
}

class App extends Component {
  state = {
    loading: false,
    text: ""
  }

  fetchApi() {
    this.setState({
      loading: true
    })

    fetch("/api")
      .then(response => response.text())
      .then(data => {
        setTimeout(() => {
          this.setState({
            loading: false,
            text: data
          })
        }, 2000)
      })
  }

  componentDidMount() {
    this.fetchApi()
  }

  render() {
    const { classes } = this.props
    const { loading, text } = this.state

    return (
      <div className={ classes.container }>
        Hello world !
        { loading ? (
          <div> Fetching data ...</div>
        ) : (
          <div>Text from API : { text }</div>
        ) }
      </div>
    )
  }
}

export default hot(module)(withStyles(styles)(App))
