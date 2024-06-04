'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


export async function searchByKeywords(
    formState: {message: string}, 
    formData: FormData
    ) {
    
    try{
         // Check the user's inputs and make sure they're valid
        const title = formData.get('allowed_keywords') as string;
        const code = formData.get('excluded_keywords') as string;
        console.log("title--------", title);
        console.log("code---------", code);

        if(typeof title != 'string' || title.length < 3){
            return {
                message: 'Title must be longer'
            };
        }

        if(typeof code != 'string' || code.length < 10){
            return {
                message: 'Code must be longer'
            };
        }

        // Create a new record in the database
        // const snippet = await db.snippet.create({
        //     data: {
        //         title,
        //         code
        //     }
        // });

    }catch (err: unknown){
        if(err instanceof Error){
            return {
                message: err.message
            };
        }else{
            return {
                message: 'Something went wrong...'
            };
        }
    }
   
    revalidatePath('/');
    // Redirect the user back to the root route
    redirect('/');

}