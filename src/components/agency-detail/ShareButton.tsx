import { IconShare } from '@/assets/icons'
import CustomIConButton from '../CustomIconButton'
import useCustomToast from '@/utils/useCustomToast'

export interface AgencyShareData {
  title: string
  text: string
  image?: string
}

function ShareButton({ shareData }: { shareData: AgencyShareData }) {
  const toast = useCustomToast()

  const handleShare = async () => {
    const canUseShareApi =
      typeof window !== 'undefined' &&
      window.navigator.canShare &&
      window.navigator.canShare(shareData)

    // Consider other share methods when share api is not available.
    if (!canUseShareApi) {
      await window.navigator.clipboard.writeText(location.href)
      toast({
        title: 'URL이 복사되었습니다.',
        status: 'info',
      })
      return
    }

    const data = {
      title: shareData.title,
      text: shareData.text,
      url: location.href,
    }
    void window.navigator.share(data)
  }
  return (
    <CustomIConButton
      variant="tertiary"
      onClick={handleShare}
      aria-label="share"
      size="sm"
      icon={<IconShare width={20} height={20} color="black" />}
      sx={{ mx: 2.5 }}
    />
  )
}

export default ShareButton
