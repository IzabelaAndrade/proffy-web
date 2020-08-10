import React, { useState, FormEvent } from "react";
import {useHistory} from 'react-router-dom'

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" }
  ])
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems, { week_day: 0, from: "", to: "" }
    ])
  }

  function setScheduleItemValue(position: number, fild: string, value: string) {
    const updateScheduleItems = scheduleItems.map((item, index) => {
      if (index === position) {
        return { ...item, [fild]: value };
      }

      return item;
    })

    setScheduleItems(updateScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      cost: Number(cost),
      subject,
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/');
    }).catch((err) => {
      alert('Erro no cadastro');
    })

  }
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title='Que incrível que você quer dar aulas.'
        description="O primeiro passo é preencher este formulário de inscrição"
      >

      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>
              Seus dados
          </legend>

            <Input label="Nome completo" name="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            <Input label="Avatar" name="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />
            <Input label="WhatsApp" name="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />
            <Textarea label="Biografia" name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            ></Textarea>
          </fieldset>

          <fieldset>
            <legend>
              Sobre a aula
          </legend>

            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Ciência', label: 'Ciência' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
              ]}
            />
            <Input label="Custo da sua hora por aula" name="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((item, index) => {
              return (
                <div key={item.week_day} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="subject"
                    value={item.week_day}
                    onChange={e => {setScheduleItemValue(index, 'week_day', e.target.value)}}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    label="Das"
                    name="from"
                    type='time'
                    value={item.from}
                    onChange={e => {setScheduleItemValue(index, 'from', e.target.value)}}
                  />
                  <Input
                    label="Até"
                    name="to"
                    type='time'
                    value={item.to}
                    onChange={e => {setScheduleItemValue(index, 'to', e.target.value)}}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type='submit'>
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>

    </div>
  )
}

export default TeacherForm;