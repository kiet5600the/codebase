import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Common/Hooks'
import { Brand } from '@/Components'
import { Button, GradientButton } from '@/Components/Button'
import { RippleButton } from '@/Components/Button/RippleButton'
import CheckBox from '@/Components/CheckBox'
import { CheckBoxRef } from '@/Components/CheckBox/type'
import { ScrollContainer } from '@/Components/Container'
import { Input, PasswordInput } from '@/Components/Input'
import { TabView } from '@/Components/TabView'
import { MediumText } from '@/Components/Text'
import { initEnv } from '@/Config/Env'
import { themeActions, ThemeState } from '@/Store/Slices'
import { translate } from '@/Translations'

const TABVIEW = [
  {
    id: 1,
    name: 'Tabview1',
  },
  {
    id: 2,
    name: 'Tabview2',
  },
  {
    id: 3,
    name: 'Tabview3',
  },
]

const ExampleContainer = () => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()
  const checkBoxRef = useRef<CheckBoxRef>(null)

  const [index, setIndex] = useState<number>(0)

  const onIndexChange = (i: number) => {
    setIndex(i)
  }

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(themeActions.changeTheme({ theme, darkMode }))
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  return (
    <ScrollContainer style={[Layout.fill]}>
      <MediumText>Env: {initEnv}</MediumText>
      <TabView
        data={TABVIEW}
        onIndexChange={onIndexChange}
        currentIndex={index}
      />
      <RippleButton title="Ripple" fullSize style={[Gutters.smallBMargin]} />
      <GradientButton
        title="Gradient"
        textType="bold"
        fullSize
        style={[Gutters.smallBMargin]}
      />
      <View style={[Layout.row, Layout.center]}>
        <Button
          title="Adjust Bold"
          textType="bold"
          style={[Gutters.smallBMargin, Gutters.smallRMargin]}
        />
        <CheckBox ref={checkBoxRef} />
      </View>
      <Button
        title="Full Size Outline"
        fullSize
        outline
        style={[Gutters.smallBMargin]}
      />
      <Button title="Full Size" fullSize />
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand height={50} width={50} />
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
          Common.backgroundPrimary,
          { backgroundColor: Colors.primary },
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
          {translate('example.labels.userId')}
        </Text>
      </View>
      <Input
        icon={{ name: 'person-outline' }}
        controller={{
          name: 'username',
          control: control,
          rules: {
            required: {
              value: true,
              message: translate('validation.require'),
            },
            validate: value =>
              value.length >= 6 ||
              `${translate('validation.min', { value: 6 })}`,
          },
        }}
        errorText={errors?.username?.message}
        placeholder={'User name'}
        autoCapitalize={'none'}
      />
      <PasswordInput
        icon={{ name: 'lock-outline' }}
        controller={{
          name: 'password',
          control: control,
          rules: {
            required: {
              value: true,
              message: translate('validation.require'),
            },
            validate: value =>
              value.length >= 6 ||
              `${translate('validation.min', { value: 6 })}`,
          },
        }}
        errorText={errors?.password?.message}
        placeholder={'Password'}
        autoCapitalize={'none'}
      />
      <Input
        icon={{ name: 'person-outline' }}
        controller={{
          name: 'username',
          control: control,
          rules: {
            required: {
              value: true,
              message: translate('validation.require'),
            },
            validate: value =>
              value.length >= 6 ||
              `${translate('validation.min', { value: 6 })}`,
          },
        }}
        errorText={errors?.username?.message}
        placeholder={'User name'}
        autoCapitalize={'none'}
      />
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>

      <TouchableOpacity
        style={[Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>
    </ScrollContainer>
  )
}

export default ExampleContainer
