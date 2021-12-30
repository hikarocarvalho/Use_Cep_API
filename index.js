import locations from "./locations.js";
const state = document.getElementById("state");
const city = document.getElementById("city");
// html elements
const inputs={
		postalCode:document.getElementById("postalCode"),
		Street:document.getElementById("street"),
		complement:document.getElementById("complement"),
		province:document.getElementById("province"),
		city:document.getElementById("city"),
		state:document.getElementById("state"),
	}
// create options
const createOptions = (newValue,element)=>{
	const newOption = document.createElement("option");
	newOption.setAttribute("value",newValue);
	newOption.innerHTML = newValue.toLocaleUpperCase();
	element.appendChild(newOption);
}	
// set list city
const setListCity = (state)=>{
	const cityList = locations[state].sort();
	cityList.map((option)=>createOptions(option,city));
}
// get new city list
const getNewCityList=()=>{
	city.innerHTML="";
	setListCity(state.value);
}
// set list states
const setListStates=()=>{
	const stateList = Object.keys(locations).sort();
	stateList.map((option)=>createOptions(option,state));
	getNewCityList();
}
// get values from api
const getValuesFromApi = async (postalNumber)=>{
	let url = "https://viacep.com.br/ws/"+postalNumber+"/json/";
	const response = await fetch(url,{method:"GET"});
	const result = await response.json();
	return result;
}
const setAddressData = async (promiseData,event)=>{
	const addressData = await promiseData;
	inputs.postalCode.value = parseInt(addressData.cep.replace(/[\s.-]*/igm, '')
);
	inputs.Street.value = addressData.logradouro;
	inputs.complement.value = addressData.complemento;
	inputs.province.value = addressData.bairro;
	inputs.state.value = addressData.uf;
	getNewCityList();
	inputs.city.value = addressData.localidade;
}
function getValues(event){
	if(inputs.postalCode.value.length===8){
		event.preventDefault();
		const addressData = getValuesFromApi(inputs.postalCode.value);
		setAddressData(addressData,event);
	}
}
inputs.postalCode.addEventListener("keyup",getValues);
//state.addEventListener("change",setListCity(state.value));
if(state.value===""){
	setListStates();
}
state.addEventListener("change",getNewCityList);