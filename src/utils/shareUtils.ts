import { RefObject } from 'react';
import { captureRef } from 'react-native-view-shot';
import RNShare from 'react-native-share';

export const shareViewAsImage = async (
  ref: RefObject<any>,
  message: string,
) => {
  const uri = await captureRef(ref, { format: 'png', quality: 0.9 });
  await RNShare.open({
    url: uri,
    type: 'image/png',
    message,
  });
};
