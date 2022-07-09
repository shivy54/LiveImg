import * as React from "react";
import {Button,Image,View,Platform, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * Permissions from "expo-permissions"

export default class PickImage extends React.Component{
    state={
        image:null
    };
    getPermissionAsync = async()=>{
        if(Platform.OS!== "web"){
            const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status !=="granted"){
                alert("I want camera permissions to work");
            } 
        }
    }
    componentDidMount(){
        this.getPermissionAsync()

    }
    _PickImage=async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                MediaTypes : ImagePicker.MediaTypeOptions.All,
                allowedEditing:true,
                aspect:[4,3],
                quality:1,
            })
            if(!result.cancelled){
                this.setState({
                    image:result.data
                })
                this.uploadImage(result.uri);
            }
        }
        catch(E){
            console.log(E);
        }
    }
    render(){
        let{image} = this.state;
        return(
            <View style ={{flex:1,alignItems:"center",justifyContent:"Center"}}>
                <Button
                title = "Camera roll opener"
                onPress = {this.pickImage}/>
                </View>
        )
    }
}
uploadImage=async(uri)=>{
    const data = new FormData();
    let filename = uri.split("/")[uri.split("/").length-1]
    let type =`image/${uri.split('.')[uri.split('.').lenght-1]}`
    const fileToUpload = {
        uri:uri,
        name:filename,
        type:type,
    }
    data.append("alpha",fileToUpload);
    fetch(""/*Ng rock link*/,{
        method:"POST",
        body:data,
        Headers:{
            "content-type":"multipart/form-data",
        }
    })
    .then((Response)=>Response.json())
    .then((result)=>{
        console.log("sucess",result);
    })
    .catch((error)=>{
        console.error("error",error);

    })

}