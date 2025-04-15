import React, { useState } from 'react';
import { useCreateTask } from '../../ListTasks/model/api/createTask';

export const CreateTask = ({ refetch }: { refetch: () => void }) => {

  const createTask  = useCreateTask();
  /*
  Проблема с assignee_id
  */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    label_id: [] as number[],
  });

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'label_id') {
      const idsArray = value
        .split(',')
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));

      setFormData(prev => ({
        ...prev,
        label_id: idsArray,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    createTask.mutate(formData, {
      onSuccess: () => {
        refetch()
        setFormData({
          title: '',
          description: '',
          label_id: [],
        });
      }
    })
  };
  return (
    <>
      <h1>CREATE TASK</h1>
      <form onSubmit={submitForm} >
        <input type="text" name='title' value={formData.title} placeholder='title' onChange={changeFormData} />
        <input type="text" name='description' value={formData.description} placeholder='description' onChange={changeFormData} />
        <input type="text" name='label_id' placeholder='Введите желаемые id через запятую' onChange={changeFormData} />
        <input type="submit" style={{cursor: 'pointer'}} value="Create" />
      </form>
    </>
  )
}