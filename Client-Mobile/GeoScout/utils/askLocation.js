export function askLocation() {
    const { Location, Permissions } = Expo;
    const { status } = Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return true;
    }else{
      return false;
    }
}