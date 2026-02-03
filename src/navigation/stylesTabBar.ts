import { StyleSheet } from 'react-native';
import { normalizeHeight } from '../utils/normalize';

export const stylesTabBar = StyleSheet.create({
  barWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 0,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0e1021',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 8,
    borderTopWidth: normalizeHeight(1),
    borderTopColor: '#464969'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    height: normalizeHeight(70),
    paddingTop:normalizeHeight(8)
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 13,
    fontFamily: 'System',
  },
});
