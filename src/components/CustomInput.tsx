import React, { cloneElement, useEffect, useRef, useState } from 'react'
import { Box, Flex, Input, TagLabel, Text } from '@chakra-ui/react'
import debounce from '@/utils/debounce'
import { Colors } from '@/styles/colors'
import { IconDangerCircle, IconDeleteCircle, IconHide, IconShow } from '@/assets/icons'
import CustomIConButton from './CustomIconButton'
import { fontStyles } from '@/styles/font'

interface CustomInputProps {
  type?: 'text' | 'password' | 'email' | 'tel'
  placeholder?: string
  supportingText?: string
  defaultValue?: string
  disabled?: boolean
  isSensitive?: boolean
  isError?: boolean
}

interface OnClicks {
  handleShowHide: () => void
  handleDelete: () => void
}

interface IconProps {
  isError: boolean
  isSensitive: boolean
  isShow: boolean
  onClicks: OnClicks
}

function Icons({ isError, isSensitive, isShow, onClicks }: IconProps) {
  let icon, handleOnClick

  if (isError) {
    icon = <IconDangerCircle />
  } else if (isSensitive) {
    icon = isShow ? <IconShow /> : <IconHide />
    handleOnClick = onClicks.handleShowHide
  } else {
    icon = <IconDeleteCircle />
    handleOnClick = onClicks.handleDelete
  }

  return (
    <CustomIConButton
      size="sm"
      icon={cloneElement(icon, {
        width: '1.5rem',
        height: '1.5rem',
        color: isError ? Colors.red[600] : Colors.gray[400],
      })}
      variant="tertiary"
      isDisabled={isError}
      onClick={handleOnClick}
    ></CustomIConButton>
  )
}

export default function CustomInput({
  type,
  placeholder,
  supportingText,
  defaultValue,
  isSensitive,
  isError,
  disabled,
}: CustomInputProps) {
  const [value, setValue] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    if (isShow) {
      inputRef.current.type = 'text'
    } else {
      inputRef.current.type = 'password'
    }
  }, [isShow])

  const handleTyping: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleShowHide = () => {
    setIsShow((prev) => !prev)
  }

  const handleDelete = () => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleIconClicks = { handleShowHide, handleDelete }

  return (
    <Box>
      <Flex
        align="center"
        w={328}
        h={12}
        px={3}
        py={2.875}
        bg={disabled ? Colors.gray[25] : Colors.white}
        border="1px solid"
        borderRadius={8}
        borderColor={isError ? Colors.red[600] : Colors.gray[300]}
        gap={4}
      >
        <Box as="label" w="100%">
          {value && (
            <Text
              color={isError ? Colors.red[600] : Colors.indigo[600]}
              sx={{ ...fontStyles.BodySm }}
            >
              {placeholder}
            </Text>
          )}
          <Input
            ref={inputRef}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={debounce(handleTyping, 50)}
            disabled={disabled}
            h="100%"
            p={0}
            border="none"
            style={{ caretColor: Colors.indigo[600] }}
            color={isError ? Colors.red[600] : Colors.gray[800]}
            _placeholder={{ color: Colors.gray[300] }}
            _disabled={{ color: Colors.gray[300] }}
            _focusVisible={{
              borderColor: 'none',
            }}
          />
        </Box>
        <Icons
          isError={isError ?? false}
          isSensitive={isSensitive ?? false}
          isShow={isShow}
          onClicks={handleIconClicks}
        />
      </Flex>
      {supportingText && (
        <Text
          px={4}
          width="100%"
          sx={{ ...fontStyles.Caption }}
          color={isError ? Colors.red[600] : disabled ? Colors.gray[300] : Colors.gray[400]}
        >
          {supportingText}
        </Text>
      )}
    </Box>
  )
}
