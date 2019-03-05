export async function askLocation() {
    const { Location, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return true;
    }else{
      return false;
    }
}