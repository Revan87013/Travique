const listing=require('../models/listing');
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.mapToken;

// Initialize geocoding client only if mapToken is available and valid
let geocodingClient;
if (mapToken && mapToken.startsWith('pk.') && mapToken !== 'YOUR_MAPBOX_ACCESS_TOKEN_HERE' && mapToken !== 'pk.test_token_1234567890abcdef') {
    try {
        geocodingClient = mbxGeoCoding({ accessToken: mapToken });
        console.log('Mapbox geocoding client initialized successfully');
    } catch (error) {
        console.warn('Warning: Failed to initialize Mapbox client:', error.message);
        geocodingClient = null;
    }
} else {
    console.warn('Warning: Valid Mapbox token not found. Geocoding features will be disabled.');
    console.warn('Please set a valid Mapbox token in your .env file.');
}

module.exports.RenderIndexPage=async(req,res)=>{
    let {Search,category}=req.query;
    if((Search===undefined || Search==='') && (category==='' || category===undefined)){
        let data = await listing.find();
        res.render('listings/index.ejs',{data});
    }
    else if(category=='' || category==undefined){
        let Searchdata=await listing.find({$or:[{location:{$regex:Search,$options:'i'}},{country:{$regex:Search,$options:'i'}}]});
        if(Searchdata.length==0){
            req.flash('error','Sorry Listing not Available');
            res.redirect('/listings');
        }
        else{
            res.render('listings/index.ejs',{data:Searchdata});
        }
    }
    else{
        let categoryData=await listing.find({category:category});
        if(categoryData.length==0){
            req.flash('error','Sorry Listing not Available');
            res.redirect('/listings');
        }
        else{
            res.render('listings/index.ejs',{data:categoryData});
        }
    }

    // else{
    //     console.log(Search,category);
    //     let SearchData=[];
        // if(category==='' || category===undefined){
        //     for(let ss of data){
        //         let des=ss.location;
        //         let country=ss.country;
                
        //         if(Search.toLowerCase()===des.toLowerCase() || Search.toLowerCase()===country.toLowerCase()){
        //            SearchData.push(ss);
        //         }
        //      }
        // }
        // else{
        //     for(let ss of data){
        //         let Orgcategory=ss.category;
        //         if(category===Orgcategory){
        //             SearchData.push(ss);
        //         }
        //      }
        // }

        // if(SearchData.length==0){
        //     req.flash('error','Sorry Not Available!');
        //     res.redirect('/listings');
        // }
        // else{
        //     res.render('listings/index.ejs',{data:SearchData});
        // }
};

module.exports.RenderNewPage=(req,res)=>{
    res.render('listings/new.ejs');
};

module.exports.CreateNewList=async(req,res)=>{
    let coordinates = [0, 0]; // Default coordinates
    
    // Only use geocoding if client is available
    if (geocodingClient) {
        try {
            let responce=await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location+','+req.body.listing.country,
                limit: 1
            }).send();
            
            if (responce.body.features && responce.body.features.length > 0) {
                coordinates = responce.body.features[0].geometry.coordinates;
            }
        } catch (error) {
            console.warn('Geocoding failed:', error.message);
            // Continue with default coordinates
        }
    } else {
        console.warn('Geocoding unavailable: using default coordinates');
    }

    let url=req.file.path;
    let filename=req.file.filename;
    let newList=req.body.listing;
    newList.owner=req.user._id;
    //Extracting the URL
    newList.image={filename,url};
    newList.geometry={
        type: "Point",
        coordinates: coordinates
    };
    let list=new listing(newList);
    await list.save();
    req.flash('success','new Listing Created');
    res.redirect('/listings');
};
module.exports.RenderEditPage=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    let imgUrl=list.image.url;
    imgUrl=imgUrl.replace('/upload','/upload/e_blur:300');
    res.render('listings/edit.ejs',{list,imgUrl});
};

module.exports.EditPage=async(req,res)=>{
    //geting Coordinates
    let coordinates = [0, 0]; // Default coordinates
    
    // Only use geocoding if client is available
    if (geocodingClient) {
        try {
            let responce=await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location+','+req.body.listing.country,
                limit: 1
            }).send();
            
            if (responce.body.features && responce.body.features.length > 0) {
                coordinates = responce.body.features[0].geometry.coordinates;
            }
        } catch (error) {
            console.warn('Geocoding failed:', error.message);
            // Continue with default coordinates
        }
    } else {
        console.warn('Geocoding unavailable: using default coordinates');
    }
    
    //Update List
    let {id}=req.params;
    let newListing=req.body;
    let data=newListing.listing;
    data.geometry = {
        type: "Point",
        coordinates: coordinates
    };
    let Listing = await listing.findByIdAndUpdate(id,{...data});
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        Listing.image={filename,url};
        await Listing.save();
    }
    //Update coordinates
    Listing.geometry = {
        type: "Point",
        coordinates: coordinates
    };
    await Listing.save();
    req.flash('success','Listing Updated');
    res.redirect(`/listings/${id}`);
};

module.exports.DeletePage=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash('success','List is Deleted');
    res.redirect(`/listings`);
};

module.exports.RenderShowPage=async(req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id)
    .populate({path:'reviews',populate:{path:'owner'}})
    .populate('owner');
    
    // Check if listing exists
    if (!list) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    
    // Ensure owner is populated or provide default
    if (!list.owner) {
        console.warn(`Warning: Listing ${id} has no owner`);
        list.owner = { username: 'Unknown User' };
    }
    
    res.render('listings/show.ejs',{ list });
};