import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrackingStatus {
  id: string;
  status: 'received' | 'transit' | 'warehouse' | 'delivering' | 'delivered';
  location: string;
  time: string;
}

interface Order {
  id: string;
  trackNumber: string;
  from: string;
  to: string;
  status: string;
  date: string;
  cost: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [trackNumber, setTrackNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');

  const mockOrders: Order[] = [
    { id: '1', trackNumber: 'CG-2024-001234', from: 'Москва', to: 'Санкт-Петербург', status: 'В пути', date: '10.11.2024', cost: 15000 },
    { id: '2', trackNumber: 'CG-2024-001122', from: 'Казань', to: 'Екатеринбург', status: 'Доставлено', date: '05.11.2024', cost: 22000 },
    { id: '3', trackNumber: 'CG-2024-000998', from: 'Новосибирск', to: 'Москва', status: 'На складе', date: '08.11.2024', cost: 35000 }
  ];

  const trackingStatuses: TrackingStatus[] = [
    { id: '1', status: 'received', location: 'Москва, склад №1', time: '10.11.2024 08:00' },
    { id: '2', status: 'transit', location: 'Трасса М11, км 450', time: '10.11.2024 14:30' },
    { id: '3', status: 'warehouse', location: 'Тверь, распределительный центр', time: '10.11.2024 18:00' },
    { id: '4', status: 'delivering', location: 'Санкт-Петербург, доставка', time: '11.11.2024 09:00' }
  ];

  const handleTracking = () => {
    if (trackNumber.trim()) {
      setShowTracking(true);
    }
  };

  const calculateCost = () => {
    if (weight && cargoType) {
      const baseRate = cargoType === 'standard' ? 50 : cargoType === 'express' ? 100 : 150;
      return Math.round(parseFloat(weight) * baseRate);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Icon name="Truck" size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CargoExpress
              </span>
            </div>
            <div className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('home')} className={`font-medium transition-colors ${activeSection === 'home' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Главная
              </button>
              <button onClick={() => setActiveSection('tracking')} className={`font-medium transition-colors ${activeSection === 'tracking' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Отслеживание
              </button>
              <button onClick={() => setActiveSection('services')} className={`font-medium transition-colors ${activeSection === 'services' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Услуги
              </button>
              <button onClick={() => setActiveSection('cabinet')} className={`font-medium transition-colors ${activeSection === 'cabinet' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Личный кабинет
              </button>
              <button onClick={() => setActiveSection('contacts')} className={`font-medium transition-colors ${activeSection === 'contacts' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Контакты
              </button>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (800) 555-0000
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 md:p-16 text-white">
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Грузоперевозки по всей России
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Быстро, надежно, с гарантией сохранности вашего груза. Отслеживание в режиме реального времени.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => setActiveSection('tracking')} className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                    <Icon name="Search" size={20} className="mr-2" />
                    Отследить груз
                  </Button>
                  <Button size="lg" onClick={() => setActiveSection('services')} variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8">
                    Оформить заказ
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </section>

            <section>
              <h2 className="text-4xl font-bold text-center mb-12">Наши преимущества</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-shadow border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
                      <Icon name="Zap" size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl">Быстрая доставка</CardTitle>
                    <CardDescription className="text-base">Экспресс-доставка от 24 часов по всей России</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-xl transition-shadow border-2 hover:border-secondary/20">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mb-4">
                      <Icon name="Shield" size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl">100% гарантия</CardTitle>
                    <CardDescription className="text-base">Страхование груза и гарантия возмещения</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-xl transition-shadow border-2 hover:border-accent/20">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-4">
                      <Icon name="MapPin" size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl">Отслеживание 24/7</CardTitle>
                    <CardDescription className="text-base">Мониторинг груза в реальном времени онлайн</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            <section className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Почему выбирают нас?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">Более 10 лет на рынке грузоперевозок</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">Собственный автопарк из 500+ транспортных средств</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">Склады в 50+ городах России</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">Поддержка клиентов круглосуточно</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                    <div className="text-gray-600">Довольных клиентов</div>
                  </Card>
                  <Card className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <div className="text-4xl font-bold text-secondary mb-2">1M+</div>
                    <div className="text-gray-600">Доставленных грузов</div>
                  </Card>
                  <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5">
                    <div className="text-4xl font-bold text-accent mb-2">99.8%</div>
                    <div className="text-gray-600">Без повреждений</div>
                  </Card>
                  <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/5">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">24/7</div>
                    <div className="text-gray-600">Поддержка клиентов</div>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'tracking' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">Отслеживание груза</h1>
              <p className="text-xl text-gray-600">Введите трек-номер для получения информации о местоположении вашего груза</p>
            </div>

            <Card className="p-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Введите трек-номер (например: CG-2024-001234)"
                    value={trackNumber}
                    onChange={(e) => setTrackNumber(e.target.value)}
                    className="text-lg h-14"
                  />
                </div>
                <Button size="lg" onClick={handleTracking} className="bg-gradient-to-r from-primary to-secondary h-14 px-8">
                  <Icon name="Search" size={20} className="mr-2" />
                  Отследить
                </Button>
              </div>
            </Card>

            {showTracking && (
              <Card className="p-8 animate-scale-in">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">Трек-номер: {trackNumber || 'CG-2024-001234'}</CardTitle>
                      <CardDescription className="text-base">Маршрут: Москва → Санкт-Петербург</CardDescription>
                    </div>
                    <Badge className="text-lg py-2 px-4 bg-secondary">В пути</Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="mb-8">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                      <span>Прогресс доставки</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-3" />
                  </div>

                  <div className="space-y-6">
                    {trackingStatuses.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            index < 3 ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-gray-200'
                          }`}>
                            <Icon
                              name={
                                item.status === 'received' ? 'Package' :
                                item.status === 'transit' ? 'Truck' :
                                item.status === 'warehouse' ? 'Warehouse' :
                                'MapPin'
                              }
                              size={24}
                              className={index < 3 ? 'text-white' : 'text-gray-400'}
                            />
                          </div>
                          {index < trackingStatuses.length - 1 && (
                            <div className={`w-1 h-16 ${index < 2 ? 'bg-gradient-to-b from-primary to-secondary' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="font-semibold text-lg mb-1">{item.location}</div>
                          <div className="text-gray-600">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Icon name="Info" size={20} />
                      <span>Ожидаемое время доставки: 11 ноября 2024, 15:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'services' && (
          <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Услуги и тарифы</h1>
              <p className="text-xl text-gray-600">Выберите подходящий тариф для вашего груза</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-2xl transition-all hover:scale-105 border-2 hover:border-primary">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
                    <Icon name="Package" size={32} className="text-gray-700" />
                  </div>
                  <CardTitle className="text-2xl">Стандарт</CardTitle>
                  <CardDescription className="text-base">Оптимальное решение для обычных грузов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-4">от 50₽<span className="text-lg text-gray-500">/кг</span></div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Доставка 3-5 дней</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Страховка до 100 000₽</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Отслеживание груза</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => setActiveSection('services')}>Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all hover:scale-105 border-2 border-secondary shadow-lg">
                <CardHeader>
                  <Badge className="mb-2 w-fit bg-secondary">Популярный</Badge>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mb-4">
                    <Icon name="Zap" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">Экспресс</CardTitle>
                  <CardDescription className="text-base">Быстрая доставка для срочных грузов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary mb-4">от 100₽<span className="text-lg text-gray-500">/кг</span></div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-secondary" />
                      <span>Доставка 1-2 дня</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-secondary" />
                      <span>Страховка до 500 000₽</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-secondary" />
                      <span>Приоритетная обработка</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => setActiveSection('services')}>Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all hover:scale-105 border-2 hover:border-accent">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-4">
                    <Icon name="Star" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">Премиум</CardTitle>
                  <CardDescription className="text-base">Максимальная забота о вашем грузе</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-accent mb-4">от 150₽<span className="text-lg text-gray-500">/кг</span></div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-accent" />
                      <span>Доставка 24 часа</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-accent" />
                      <span>Страховка до 2 000 000₽</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-accent" />
                      <span>Персональный менеджер</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => setActiveSection('services')}>Заказать</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-3xl">Рассчитать стоимость доставки</CardTitle>
                <CardDescription className="text-base">Заполните форму для получения расчета стоимости</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="from" className="text-base">Откуда</Label>
                      <Input id="from" placeholder="Город отправления" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="to" className="text-base">Куда</Label>
                      <Input id="to" placeholder="Город назначения" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-base">Вес груза (кг)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Введите вес"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type" className="text-base">Тип груза</Label>
                      <Select value={cargoType} onValueChange={setCargoType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Стандартный</SelectItem>
                          <SelectItem value="express">Экспресс</SelectItem>
                          <SelectItem value="premium">Премиум</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dimensions" className="text-base">Габариты (см)</Label>
                      <Input id="dimensions" placeholder="Длина x Ширина x Высота" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-base">Описание груза</Label>
                      <Textarea id="description" placeholder="Опишите ваш груз" className="mt-2" />
                    </div>
                  </div>
                </div>
                {calculateCost() > 0 && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-600 mb-1">Примерная стоимость доставки:</div>
                        <div className="text-4xl font-bold text-primary">{calculateCost().toLocaleString()} ₽</div>
                      </div>
                      <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'cabinet' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-2">Личный кабинет</h1>
                <p className="text-xl text-gray-600">Управление вашими заказами и доставками</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary" size="lg">
                <Icon name="Plus" size={20} className="mr-2" />
                Новый заказ
              </Button>
            </div>

            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto">
                <TabsTrigger value="active" className="text-base py-3 px-6">Активные заказы</TabsTrigger>
                <TabsTrigger value="history" className="text-base py-3 px-6">История</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-6">
                {mockOrders.filter(order => order.status !== 'Доставлено').map(order => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-xl font-bold">{order.trackNumber}</div>
                            <Badge className={order.status === 'В пути' ? 'bg-secondary' : 'bg-primary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Icon name="MapPin" size={18} className="text-primary" />
                              <span>{order.from} → {order.to}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Calendar" size={18} className="text-primary" />
                              <span>{order.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="DollarSign" size={18} className="text-primary" />
                              <span>{order.cost.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setTrackNumber(order.trackNumber);
                            setActiveSection('tracking');
                            setShowTracking(true);
                          }}
                        >
                          <Icon name="Search" size={18} className="mr-2" />
                          Отследить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                {mockOrders.filter(order => order.status === 'Доставлено').map(order => (
                  <Card key={order.id} className="opacity-75 hover:opacity-100 transition-opacity">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-xl font-bold">{order.trackNumber}</div>
                            <Badge className="bg-green-500">{order.status}</Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Icon name="MapPin" size={18} className="text-primary" />
                              <span>{order.from} → {order.to}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Calendar" size={18} className="text-primary" />
                              <span>{order.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="DollarSign" size={18} className="text-primary" />
                              <span>{order.cost.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost">
                          <Icon name="FileText" size={18} className="mr-2" />
                          Документы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Контакты</h1>
              <p className="text-xl text-gray-600">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Телефон</h3>
                <p className="text-gray-600 mb-2">+7 (800) 555-0000</p>
                <p className="text-sm text-gray-500">Звонок бесплатный</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Email</h3>
                <p className="text-gray-600 mb-2">info@cargoexpress.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение часа</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Адрес</h3>
                <p className="text-gray-600 mb-2">г. Москва, ул. Логистическая, 10</p>
                <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
              </Card>
            </div>

            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-3xl">Обратная связь</CardTitle>
                <CardDescription className="text-base">Оставьте сообщение, и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-base">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base">Телефон</Label>
                      <Input id="phone" placeholder="+7 (___) ___-__-__" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-base">Сообщение</Label>
                    <Textarea id="message" placeholder="Опишите ваш вопрос или пожелание" rows={6} className="mt-2" />
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">CargoExpress</span>
              </div>
              <p className="text-gray-400">Надежные грузоперевозки по всей России с 2014 года</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Стандартная доставка</li>
                <li className="hover:text-white cursor-pointer transition-colors">Экспресс доставка</li>
                <li className="hover:text-white cursor-pointer transition-colors">Премиум доставка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-white cursor-pointer transition-colors">Вакансии</li>
                <li className="hover:text-white cursor-pointer transition-colors">Партнерам</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (800) 555-0000</li>
                <li>info@cargoexpress.ru</li>
                <li>Работаем 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CargoExpress. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
