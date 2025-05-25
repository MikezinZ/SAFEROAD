import './style.css'
import Lixo from '../../assets/Lixo.jpg'
function Home() {

  const users = [{
    id: '2342634',
    name: 'miguelito',
    age: 11,
    email: 'miguelito@gmail.mig'
  }, {
    id: '234264234',
    name: 'tralalerotralala',
    age: 123,
    email: 'tungtungsahur@sahur'

  }

  ]


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder='Insira o nome: ' name='Nome' type='text' />
        <input placeholder='Insira a idade: ' name='Idade' type='number' />
        <input placeholder='Insira o email: ' name='Email' type='email' />
        <button type='button'>Cadastras</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img className='Img_Lixo' src={Lixo} />
          </button>
        </div>


      ))}

    </div>
  )
}

export default Home
