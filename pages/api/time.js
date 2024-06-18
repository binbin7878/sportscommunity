let today=new Date();

export default function TimeCheck(req,res){
    return(
        
        res.status(200).json(today.toLocaleString())
    )
}