exports.getAllUsers=(req,res)=>{
    const users=[
        { id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }
    ]
    res.status(200).json(users)
}

exports.createUser = (req, res) => {
  const newUser = req.body; 

  res.status(201).json(newUser);
};