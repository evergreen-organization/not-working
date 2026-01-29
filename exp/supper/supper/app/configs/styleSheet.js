import { StyleSheet } from 'react-native';

const gStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  shadow_light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shadow_big: {
    shadowColor: '#958A8A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  shadow_bottomBtn: {
    shadowColor: '#958A8A',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  textArea: {
    flex: 1,
    backgroundColor: '#FFF',
    fontSize: 16,
    paddingHorizontal: 0,
    fontWeight: 'normal',
  },
  topRight: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#555',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tick: {
    position: 'absolute',
    fontSize: 12,
    color: '#FFF',
    zIndex: 1
  },
  imgBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  hyperlink: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline'
  },
  rowOdd: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  bigRowOdd: {
    backgroundColor: '#F1F1F1',
    padding: 10,
  },
  rowEven: {
    backgroundColor: '#FFF',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  bigRowEven: {
    backgroundColor: '#FFF',
    padding: 10,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15
  },
  dots: {
    flexDirection: "row",
    marginVertical: 8
  },
});

export default gStyles