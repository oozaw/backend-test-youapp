import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/common';
import { Model } from 'mongoose';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createProfile(userId: string, dto: CreateProfileDto) {
    dto.horoscope = this.getHoroscope(dto.birthday);
    dto.zodiac = this.getZodiac(dto.birthday);

    try {
      const user = await this.userModel.findByIdAndUpdate(userId, dto, {
        new: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userModel.findById(userId);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    dto.horoscope = this.getHoroscope(dto.birthday);
    dto.zodiac = this.getZodiac(dto.birthday);

    try {
      const user = await this.userModel.findByIdAndUpdate(userId, dto, {
        new: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  getHoroscope(birthday: string) {
    const date = new Date(birthday);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
      return 'Capricorn';
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
      return 'Aquarius';
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return 'Pisces';
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
      return 'Aries';
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
      return 'Taurus';
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return 'Gemini';
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
      return 'Cancer';
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
      return 'Leo';
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
      return 'Virgo';
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
      return 'Libra';
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
      return 'Scorpius';
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
      return 'Sagittarius';
    } else {
      return 'Error';
    }
  }

  getZodiac(birthday: string) {
    const date = new Date(birthday);

    const chineseZodiacSigns = [
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
      'Dog',
      'Pig',
    ];

    const chineseNewYearMonthDay = {
      1912: '2-18',
      1913: '2-6',
      1914: '1-26',
      1915: '2-14',
      1916: '2-3',
      1917: '1-23',
      1918: '2-11',
      1919: '2-1',
      1920: '2-20',
      1921: '2-8',
      1922: '1-28',
      1923: '2-16',
      1924: '2-5',
      1925: '1-25',
      1926: '2-13',
      1927: '2-2',
      1928: '1-23',
      1929: '2-10',
      1930: '1-30',
      1931: '2-17',
      1932: '2-6',
      1933: '1-26',
      1934: '2-14',
      1935: '2-4',
      1936: '1-24',
      1937: '2-11',
      1938: '1-31',
      1939: '2-19',
      1940: '2-8',
      1941: '1-27',
      1942: '2-15',
      1943: '2-5',
      1944: '1-25',
      1945: '2-13',
      1946: '2-2',
      1947: '1-22',
      1948: '2-10',
      1949: '1-29',
      1950: '2-17',
      1951: '2-6',
      1952: '1-27',
      1953: '2-14',
      1954: '2-3',
      1955: '1-24',
      1956: '2-12',
      1957: '1-31',
      1958: '2-18',
      1959: '2-8',
      1960: '1-28',
      1961: '2-15',
      1962: '2-5',
      1963: '1-25',
      1964: '2-13',
      1965: '2-2',
      1966: '1-21',
      1967: '2-9',
      1968: '1-30',
      1969: '2-17',
      1970: '2-6',
      1971: '1-27',
      1972: '1-16',
      1973: '2-3',
      1974: '1-23',
      1975: '2-11',
      1976: '1-31',
      1977: '2-18',
      1978: '2-7',
      1979: '1-28',
      1980: '2-16',
      1981: '2-5',
      1982: '1-25',
      1983: '2-13',
      1984: '2-2',
      1985: '2-20',
      1986: '2-9',
      1987: '1-29',
      1988: '2-17',
      1989: '2-6',
      1990: '1-27',
      1991: '2-15',
      1992: '2-4',
      1993: '1-23',
      1994: '2-10',
      1995: '1-31',
      1996: '2-19',
      1997: '2-7',
      1998: '1-28',
      1999: '2-16',
      2000: '2-5',
      2001: '1-24',
      2002: '2-12',
      2003: '2-1',
      2004: '1-22',
      2005: '2-9',
      2006: '1-29',
      2007: '2-18',
      2008: '2-7',
      2009: '1-26',
      2010: '2-14',
      2011: '2-3',
      2012: '1-23',
      2013: '2-10',
      2014: '1-31',
      2015: '2-19',
      2016: '2-8',
      2017: '1-28',
      2018: '2-16',
      2019: '2-5',
      2020: '1-25',
      2021: '2-12',
      2022: '2-1',
      2023: '1-22',
      2024: '2-10',
      2025: '1-29',
      2026: '2-17',
      2027: '2-6',
      2028: '1-26',
      2029: '2-13',
      2030: '2-3',
    };

    const year = date.getFullYear();
    const chineseNewYear = new Date(`${year}-${chineseNewYearMonthDay[year]}`);
    const isBeforeChineseNewYear = date < chineseNewYear;
    var chineseZodiacIndex = (year - 4) % 12;

    if (isBeforeChineseNewYear) {
      chineseZodiacIndex -= 1;
    }

    return chineseZodiacSigns[chineseZodiacIndex];
  }
}
