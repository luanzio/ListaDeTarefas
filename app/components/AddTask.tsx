'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await addTodo({ id: uuidv4(), text: newTaskValue });
    setNewTaskValue('');
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Adicione uma nova tarefa <AiOutlinePlus className="ml-1" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Adicionar nova tarefa</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Digite a tarefa"
              className="input input-bordered input-primary w-full max-full"
            />
            <button type="submit" className="btn">
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
