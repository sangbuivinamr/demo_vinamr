/**
 * Contributor: Tiến 28/11/2020
 * Main function: Render the Audio/Photo is clicked
 */

//Packages
import React , {useState , useEffect} from "react";
import axios from 'axios'
//Style
import "./styles/PreviewAssests.css";
//URLs
import URL_MODULE_4 from './config'


const PreviewAssets = (props) => {
  const interviewID = props.location.state.interviewid;
  const SrvyID = props.location.state.SrvyID;
  const mediaType = props.location.state.mediaType

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [mediaData, setMediaData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(URL_MODULE_4.URL_MEDIA + `?srvyId=${SrvyID}&projectId=${localStorage.getItem('currentprojectid')}&interviewId=${interviewID}&type=${mediaType}`)
      let mediaData = data.data.file;
      for(let i in mediaData){
        if(mediaType === 'audio'){
          mediaData[i] = 'data:audio/mpeg;base64,' + mediaData[i]
        }else mediaData[i] = 'data:image/jpeg;base64,' + mediaData[i];
        
      }
      setMediaData(mediaData)
      console.log(mediaData)
      forceUpdate();
    }
    getData();
  } , [])

  return (
    <div className = "preview-assets" >
        <div className = 'module-4--media'>
          {mediaData.map((dataURI , index) => {
              let audio = new Audio(dataURI)
              return (mediaType === 'audio' ? 
              <div key = {index} className = 'module-4--media-wrapper'>  
                  Pages : {index}
                  <audio controls>
                    <source src={dataURI} />
                  </audio>
              </div>: 
              <div key = {index} className = 'module-4--media-wrapper'>
                  Pages : {index}
                  <img src = {dataURI} className = 'module-4--media--photo'></img>
              </div>)
          })}

        </div>
    </div>
  );
};
export default PreviewAssets;
