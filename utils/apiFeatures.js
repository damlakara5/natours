class APIFeatures  {
    constructor (query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    filter() {
          //FILTERING
          const queryObj = {...this.queryString}   //this.queryString = req.query
          const excludedFields = ["page","sort","limit", "fields"]
          excludedFields.forEach(el => delete queryObj[el])
  
          //on the mongodb we have to write manually {"duration":{"$gte":"5"}}
          //our query querObj has {"duration":{"gte":"5"}} so qw replaced gte to $gte
          let queryStr = JSON.stringify(queryObj)
          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}` )
        
          this.query = this.query.find(JSON.parse(queryStr))
         // let query =  Tour.find(JSON.parse(queryStr)) 

         return this;
    }

    sort(){
        if(this.queryString.sort){ //req.query.sort
            //sort(price ratingAverage)
            const sortBy = this.queryString.sort.split(",").join(" ")
    
            this.query = this.query.sort(sortBy)
        }else{
            //sort by default
            this.query = this.query.sort('-createdAt')
        }

        return this; //return  the entire object

    }

    limitFields(){
        if(this.queryString.fields){
            //select(price ratingAverage)
            const fields = this.queryString.fields.split(",").join(" ")
    
            this.query = this.query.select(fields)
        }else{
            //sort by default
            // - (minus) is excluding, set everything but instead this
            this.query = this.query.select('-__v')
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page-1) * limit

        //if the query is page=2 limit=10, we want to 11,20, so we skip the first 10 element
        this.query = this.query.skip(skip).limit(limit)
    
        return this
    
    }
}

module.exports = APIFeatures