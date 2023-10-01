import React from 'react';
import { Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CardCreationForm = ({ onCardCreate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      cardname: e.target.cardname.value,
      cardType: e.target.cardType.value,
      cost: parseInt(e.target.cost.value, 10),
      attack: parseInt(e.target.attack.value, 10),
      defense: parseInt(e.target.defense.value, 10),
      description: e.target.description.value,
      effectType: e.target.effectType.value,
      imageUrl: e.target.imageUrl.value
    };
    onCardCreate(newCard);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">カード情報入力</Typography>
      <TextField label="カード名" name="cardname" fullWidth required />
      
      <FormControl fullWidth required>
        <InputLabel>カードタイプ</InputLabel>
        <Select name="cardType">
          <MenuItem value="follower">Follower</MenuItem>
          <MenuItem value="spell">Spell</MenuItem>
          <MenuItem value="amulet">Amulet</MenuItem>
        </Select>
      </FormControl>
      
      <TextField type="number" label="コスト" name="cost" fullWidth required />
      <TextField type="number" label="攻撃力" name="attack" fullWidth required />
      <TextField type="number" label="防御力" name="defense" fullWidth required />
      <TextField label="説明" name="description" fullWidth multiline rows={4} />
      
      <FormControl fullWidth>
        <InputLabel>効果タイプ</InputLabel>
        <Select name="effectType">
          <MenuItem value="attack">Attack</MenuItem>
          <MenuItem value="heal">Heal</MenuItem>
          <MenuItem value="resource">Resource</MenuItem>
        </Select>
      </FormControl>
      
      <TextField label="画像URL" name="imageUrl" fullWidth required />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        カードを作成
      </Button>
    </form>
  );
};

export default CardCreationForm;
