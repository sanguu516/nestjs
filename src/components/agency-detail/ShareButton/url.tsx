import { IconLink } from '@/assets/icons'
import CustomIConButton from '@/components/CustomIconButton'
import { type AgencyShareData } from '@/components/agency-detail/ShareButton'
import useCustomToast from '@/utils/useCustomToast'

export default function UrlShare({ shareData }: { shareData: AgencyShareData }) {
  const toast = useCustomToast()

  const handleShare = async () => {
    const canUseShareApi = typeof window !== 'undefined' && window.navigator.canShare?.(shareData)

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
      icon={<IconLink width={24} height={24} color="black" />}
    />
  )
}
