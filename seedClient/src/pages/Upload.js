import React, { Component } from 'react'
const URL = require("../../package.json").serverURL;

export default class Upload extends React.Component {
    constructor() {
        super();
    }
    
    save = (e) => {
        var input = document.querySelector('input[type="file"]');
        var data = new FormData();
        data.append('file', input.files[0]);
        fetch(URL + 'api/upload/file', {
          method: 'POST',
          body: data
        });
        e.preventDefault();
      }

    render() {
        return (
            <div>
            <h2>Upload file</h2>
            <form onSubmit={this.save}>
              <label>Select File</label><input type= "file" name="file" /> <br/><br/>
              <button type="submit">Upload</button>
              </form>
            </div>
        )
    }
}