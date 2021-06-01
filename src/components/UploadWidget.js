import { Component } from 'react'

class UploadWidget extends Component {
  constructor(props) {
    super(props)
  }

  openWidget = () => {
    // create the widget
    console.log(window)
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dq6gwvtbz',
        uploadPreset: 'rznwdq8a',
        sources: [
            "url",
            "local"
        ],
        cropping: true,
        defaultSource: "url"
      },
      (error, result) => {
        if (result.event === 'success') {
          const imageUrl = result.info.secure_url
          const imageAlt = `An image of ${result.info.original_filename}`
          this.props.handleImageUrlChange(imageUrl, imageAlt)
        }
      },
    );
    widget.open(); // open up the widget after creation
  };

  removeUploadedImage = () => {
    const imageUrl = ""
    const imageAlt = ""
    this.props.handleImageUrlChange(imageUrl, imageAlt)
  }

  render() {
    return (
      <>
        {
          this.props.imageUrl ? "" : <button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Picture</button>
        }
        <div className="uploaded-image-box mb-3">
        {
          this.props.imageUrl ?
            <>
              <img src={this.props.imageUrl} alt={this.props.imageAlt} className={"uploaded-image"} />
              <button className="uploaded-image-delete-btn" onClick={this.removeUploadedImage} >x</button>
            </>
            : ""
        }

        </div>
      </>
    )
  }
}

export default UploadWidget;
