import React from 'react';
const formValidation = ({input, meta})=>{

       return(
           <div>
               <input {...input}/>
               <div>
                    {meta.touched && meta.error}
               </div>
               
           </div>
           
       )

   
}

export default formValidation;