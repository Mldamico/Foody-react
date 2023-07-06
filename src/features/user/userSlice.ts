interface Position {
  coords: { latitude: number; longitude: number };
}
interface Address {
  locality: any;
  city: any;
  postcode: any;
  countryName: any;
}

function getAddress(position: {
  latitude: number;
  longitude: number;
}): Address {
  return { locality: "", city: "", postcode: 11, countryName: "" };
}

function getPosition(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  const positionObj: Position = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
}
