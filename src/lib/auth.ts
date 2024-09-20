export const getUser = async ()=>{

    try {
        const token = document.cookie?.split(';')?.map(i => i.trim())?.find(i => i.startsWith('token='))?.split('=')[1] as string || '';
        
        if(!token) return {isLoggedIn:false,user:null,error:true,err:'Unauthorized Please Login'}
        const response = await fetch(`http://localhost:5000/auth/user`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if(data.status == 400) return {isLoggedIn:false,user:null,error:true,err:'Unauthorized Please Login'} 
          if(data?.user?.email) return {isLoggedIn:true,user:data.user,error:false,err:null}
          else return {isLoggedIn:false,user:null,error:false,err:null}
     } catch (error:any) {
         return {isLoggedIn:false,user:null,error:true,err:error?.message as string || 'Something goes wrong'}
    }
}