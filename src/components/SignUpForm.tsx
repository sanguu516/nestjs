/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '@/components/CustomInput'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { SignFormList } from '@/utils/inputFormUtil'
import { Box, FormLabel, Grid } from '@chakra-ui/react'
import { useCallback } from 'react'

export default function SignupForm({
  list: { title, forms },
  isInvalids,
  setForm,
  hasLabel = true,
}: {
  list: SignFormList
  isInvalids: Record<string, boolean>
  setForm: React.Dispatch<React.SetStateAction<any>>
  hasLabel?: boolean
}) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <Box>
      {hasLabel && (
        <FormLabel color={Colors.gray[400]} sx={{ ...fontStyles.TitleSm }} mb={4}>
          {title}
        </FormLabel>
      )}
      <Grid gap={2}>
        {forms.map((form) => {
          const initializeValue = () => {
            setForm((prev: any) => ({ ...prev, [form.name]: '' }))
          }

          return (
            <CustomInput
              id={form.name}
              key={form.name}
              name={form.name}
              type={form.type}
              placeholder={form.placeholder}
              supportingText={form?.supportingText}
              onChange={onChange}
              isSensitive={form.isSensitive}
              isInvalid={!!isInvalids[form.name] ?? false}
              initializeValue={initializeValue}
              w="100%"
            />
          )
        })}
      </Grid>
    </Box>
  )
}
