const AuthenticateHelper=()=>{

	const token = localStorage.getItem('token');

	if(!token){
		return false;
	}else{
		return true;
	}	
}

export default AuthenticateHelper;