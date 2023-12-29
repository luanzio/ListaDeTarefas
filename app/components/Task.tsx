'use client';
import { ITask } from '@/types/tasks';
import React, { FormEventHandler, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await editTodo({ id: task.id, text: taskToEdit });
    setOpenModalEdit(false);
    router.refresh();
  };
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <BiEdit
          onClick={() => setOpenModalEdit(true)}
          className="text-blue-500"
          cursor="pointer"
          size={20}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Editar tarefa</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Digite a tarefa"
                className="input input-bordered input-primary w-full max-full"
              />
              <button type="submit" className="btn">
                Editar
              </button>
            </div>
          </form>
        </Modal>
        <BsFillTrashFill
          onClick={() => setOpenModalDelete(true)}
          className="text-red-500"
          cursor="pointer"
          size={20}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Deseja deletar a tarefa?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Sim
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
