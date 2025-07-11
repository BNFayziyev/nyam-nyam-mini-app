import logging
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import WebAppInfo
from dotenv import load_dotenv
import os

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))
CHECK_ADMIN_ID = int(os.getenv("CHECK_ADMIN_ID"))
WEB_APP_URL = os.getenv("WEB_APP_URL")

bot = Bot(token=BOT_TOKEN, parse_mode="HTML")
dp = Dispatcher(bot)
logging.basicConfig(level=logging.INFO)

@dp.message_handler(commands=["start"])
async def start(msg: types.Message):
    kb = types.ReplyKeyboardMarkup(resize_keyboard=True)
    kb.add(types.KeyboardButton("🛍 Do‘kon", web_app=WebAppInfo(url=WEB_APP_URL)))
    await msg.answer("Assalomu alaykum! 'Nyam Nyam' do‘konimizga xush kelibsiz!", reply_markup=kb)

@dp.message_handler(content_types=types.ContentType.WEB_APP_DATA)
async def web_app_handler(msg: types.Message):
    try:
        order = msg.web_app_data.data
        await bot.send_message(ADMIN_ID, f"🛒 <b>Yangi buyurtma:</b>{order}")
        await bot.send_message(CHECK_ADMIN_ID, f"🧾 <b>Chek yuborilishini kutamiz:</b>{order}")
        await msg.answer("✅ Buyurtmangiz qabul qilindi. Adminlar siz bilan tez orada bog'lanadi.")
    except Exception as e:
        await msg.answer(f"Xatolik: {e}")

@dp.message_handler(content_types=["photo", "document"])
async def handle_check(msg: types.Message):
    if msg.from_user.id != CHECK_ADMIN_ID:
        await bot.send_message(CHECK_ADMIN_ID, f"🧾 Chek yuborildi: From: @{msg.from_user.username or msg.from_user.full_name}")
        await msg.forward(CHECK_ADMIN_ID)
        await msg.answer("✅ Chekingiz adminlarga yuborildi. Tasdiqlanishini kuting.")

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)