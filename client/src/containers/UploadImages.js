import React from 'react'
import widgetStyle from './widgetStyle';
import { customInstance as axios } from '../config.js'
import { BsUpload} from 'react-icons/bs'

export default function UploadImages(props) {

    const uploadWidget = () => {
        window.cloudinary.openUploadWidget({ 
        	cloud_name: process.env.REACT_APP_CLOUD_NAME, 
        	upload_preset: process.env.REACT_APP_UPLOAD_PRESET, 
			tags:['user'],
			stylesheet:widgetStyle
        },(error, result)=> {
			if(error){
				console.log(error)
			}else{
				upload_picture(result)	  
			}
		});
	}

	
	const upload_picture = async (result) => {
        try{ 
			const response = await axios.post('/pictures/upload',{	
				photo_url:result[0].secure_url, 
				public_id:result[0].public_id
			})															
			response.data.ok? 
			props.setProductDetails({...props.productDetails, image: response.data.created}): 
			alert('Something went wrong')
		}catch(error){
			console.log(error)
		}
	}

	return (
		<div className="flex_upload">
			<div className="upload">					
				<button type="button" className ="upload-button"
					onClick={uploadWidget} ><BsUpload /><span>Upload Image</span>
				</button>
			</div>
		</div>
		)
}
